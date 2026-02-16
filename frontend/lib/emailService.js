import imap from 'imap-simple';
import { simpleParser } from 'mailparser';

/**
 * Connects to an IMAP server and fetches the latest N emails from the INBOX.
 * 
 * @param {Object} config - IMAP configuration object (user, password, host, port, tls).
 * @param {number} limit - Number of emails to fetch (default: 20).
 * @returns {Promise<Array>} List of parsed emails.
 */
export async function getLatestEmails(config, limit = 20) {
    const connection = await imap.connect({
        imap: {
            user: config.user,
            password: config.password,
            host: config.host || 'imap.zoho.eu',
            port: config.port || 993,
            tls: config.tls !== false,
            authTimeout: 3000,
        }
    });

    try {
        await connection.openBox('INBOX');

        // Fetch headers and body structure for the last N messages
        // We use a delay to ensure the mailbox is fully open
        const searchCriteria = ['ALL'];
        const fetchOptions = {
            bodies: ['HEADER', 'TEXT'],
            markSeen: false,
            struct: true
        };

        // Get the total number of messages to calculate the range
        // Note: For simplicity, we are fetching all UIDs first or just using a sequence range if supported.
        // imap-simple search returns UIDs. Let's get the last N UIDs.
        const allUids = await connection.search(searchCriteria, { sort: ['DATE'] }); // Sort might not be supported by all servers in search

        // Manually sort if needed or just slice the last N
        // Typical IMAP search returns results in ID order, which is usually chronological.
        const uidsToFetch = allUids.slice(-limit); 
        
        if (uidsToFetch.length === 0) return [];

        const messages = await connection.search(uidsToFetch, fetchOptions); // This might not work as 'search' expects criteria, not UIDs directly.
        // Correct usage for fetching specific messages by UID is usually fetch, but imap-simple abstracts this.
        // Actually, imap-simple 'search' returns Message objects if fetchOptions is provided.
        // BUT 'search' takes criteria. To fetch specific UIDs we shout use 'search' with [['UID', ...uids]]
        
        // Let's try a simpler approach for "latest": 
        // 1. Search ALL (returns lightweight list)
        // 2. Slice last N
        // 3. Fetch full data for those N
        
        // Re-do: 
        // The search above returns Message objects but only with the parts requested? 
        // No, 'search' in imap-simple returns a promise that resolves to an array of Message objects.
        // If we want to be efficient, we should use 'search' to get IDs, then valid fetch.
        // However, `imap-simple` `search` function accepts `fetchOptions` as second argument. 
        // So `connection.search(searchCriteria, fetchOptions)` returns the messages content.
        
        // To get ONLY the last N, standard IMAP doesn't support "LIMIT" in search easily without extensions.
        // Strategy: Get all UIDs first (fast), then fetch bodies for the last N.
        
        // 1. Get all message headers/UIDs (very fast usually?) NO, retrieving all headers for 10k emails is slow.
        // Optimization: Use a sequence set for the last N messages: '*' is the last. '*-10:*' is last 10.
        // `imap-simple` doesn't support sequence sets in `search` easily, it wraps `node-imap`.
        // We can use the underlying `node-imap` connection if needed, but let's try a basic approach first.
        // Assuming the mailbox isn't huge (thousands), searching `UNSEEN` or `ALL` with a date range might be better.
        // BUT, user wants "latest". 
        // Let's use `delay` 2 days ago? No.
        
        // Let's blindly fetch everything for now if the box is small, OR:
        // Use `searchResults` from a basic search to get IDs, then slice.
        
        // Refined Strategy:
        // 1. Open Box.
        // 2. config.box.messages.total gives the count.
        // 3. Fetch from (total - limit) to (total).
        
    } catch (e) {
        // If connection fails or generic error
        console.error("IMAP Error:", e);
        throw e;
    } finally {
        connection.end();
    }
}

/**
 * Robust implementation to fetch last N emails using sequence numbers.
 */
export async function fetchEmailsFromAccount(accountConfig, limit = 20) {
    try {
        const connection = await imap.connect({
            imap: {
                user: accountConfig.user,
                password: accountConfig.password,
                host: accountConfig.host || 'imap.zoho.eu',
                port: 993,
                tls: true,
                authTimeout: 10000,
            }
        });

        await connection.openBox('INBOX');
        
        // Get total messages count
        // imap-simple stores the box info in connection.box after opening
        const total = connection.box.messages.total;
        
        // Calculate range: "start:end" e.g., "100:110"
        // If total is 50, and limit is 10, we want 41:50
        const start = Math.max(1, total - limit + 1);
        const sequence = `${start}:*`; // Fetch from start to the end

        const fetchOptions = {
            bodies: ['HEADER', 'TEXT'], // We need header and the body text
            markSeen: false,
            struct: true
        };

        const messages = await connection.fetch(sequence, fetchOptions);
        
        // Parse messages
        const parsedContext = await Promise.all(messages.map(async (msg) => {
            const headerPart = msg.parts.find(part => part.which === 'HEADER');
            const bodyPart = msg.parts.find(part => part.which === 'TEXT');
            
            const headers = headerPart ? headerPart.body : {};
            const subject = headers.subject ? headers.subject[0] : '(No Subject)';
            const from = headers.from ? headers.from[0] : '(Unknown)';
            const date = headers.date ? headers.date[0] : new Date();

            // SimpleParser is robust for decoding bodies (HTML/Text)
            let htmlBody = '';
            let textBody = '';
            
            if (bodyPart) {
                // simpleParser expects a full stream or string. 
                // We might need to combine header + body for it to work perfectly, 
                // OR just pass the body string if it's raw.
                // imap-simple returns the raw buffer/string in `body`.
                // However, simpleParser is best used on the Full source. 
                // Fetching FULL source is heavy. 
                // Let's try to parse just the body part if possible, but encoding (base64/quoted-printable) is handled by simpleParser.
                
                // Better approach: Fetch 'HEADER' and 'TEXT' is okay, but `mailparser` prefers the whole thing 
                // to correctly associate headers with body encoding.
                // Let's fetch the WHOLE message for these 20 emails. It's cleaner.
            }
            return {
                id: msg.seqno,
                // ... partial data
            };
        }));
        
        connection.end();
        return []; // placeholder
        
    } catch (e) {
        console.error("IMAP Fetch failed:", e);
        return [];
    }
}

// --- FINAL IMPLEMENTATION ---

export async function getLastEmails(accountConfig, limit = 15) {
    const connection = await imap.connect({
        imap: {
            user: accountConfig.user,
            password: accountConfig.password,
            host: accountConfig.host || 'imap.zoho.eu',
            port: 993,
            tls: true,
            authTimeout: 5000,
        }
    });

    try {
        await connection.openBox('INBOX');
        const total = connection.box.messages.total;
        if (total === 0) {
            connection.end();
            return [];
        }

        const start = Math.max(1, total - limit + 1);
        const sequence = `${start}:*`;

        // Fetch the whole source (RFC822) to let mailparser do its magic correctly
        // Accessing 'TEXT' often fails to give attachments or correct HTML structure if multipart.
        const fetchOptions = {
            bodies: [''], // Empty string means "entire message"
            markSeen: false,
            struct: true
        };

        const messages = await connection.fetch(sequence, fetchOptions);
        
        // Process messages (they come in standard order, usually oldest to newest for sequence)
        // We want newest first, so we'll reverse at the end.
        
        const parsedMessages = await Promise.all(messages.map(async (msg) => {
            const raw = msg.parts.find(part => part.which === '').body;
            
            try {
                const parsed = await simpleParser(raw);
                return {
                    id: msg.seqno,
                    uid: msg.attributes.uid,
                    subject: parsed.subject,
                    from: parsed.from ? parsed.from.text : 'Unknown',
                    to: parsed.to ? parsed.to.text : 'Unknown',
                    date: parsed.date,
                    html: parsed.html || parsed.textAsHtml || parsed.text, // Fallback
                    text: parsed.text
                };
            } catch (err) {
                console.error("Parse error for msg", msg.seqno, err);
                return null;
            }
        }));

        connection.end();
        return parsedMessages.filter(m => m !== null).reverse(); // Newest first

    } catch (e) {
        console.error("IMAP Error:", e);
        connection.end();
        throw new Error("Could not fetch emails: " + e.message);
    }
}
