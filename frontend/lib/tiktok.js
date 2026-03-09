import crypto from 'crypto';

/**
 * Hashes data using SHA-256 as required by TikTok.
 * @param {string} data - The string to hash.
 * @returns {string} - The hashed string.
 */
function hashData(data) {
  if (!data) return '';
  return crypto
    .createHash('sha256')
    .update(data.trim().toLowerCase())
    .digest('hex');
}

/**
 * Sends a server-side event to TikTok.
 * @param {Object} params
 * @param {string} params.eventName - The name of the event (e.g., 'Contact', 'CompleteRegistration').
 * @param {Object} params.userData - User data for matching (email, phone, etc.).
 * @param {Object} [params.eventProperties] - Additional properties (value, currency, etc.).
 */
export async function sendTikTokServerEvent({ eventName, userData, eventProperties = {} }) {
  const PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || 'D6IAM33C77U4C3682GQG';
  const ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN;
  const TEST_EVENT_CODE = process.env.TIKTOK_TEST_EVENT_CODE;

  if (!ACCESS_TOKEN) {
    console.warn('⚠️ TikTok Access Token missing. Server event skipped.');
    return;
  }

  const payload = {
    event_source: "web",
    event_source_id: PIXEL_ID,
    data: [
      {
        event: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: `ev_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user: {
          emails: userData.email ? [hashData(userData.email)] : [],
          phones: userData.phone ? [hashData(userData.phone)] : [],
        },
        properties: eventProperties,
      }
    ]
  };

  if (TEST_EVENT_CODE) {
    payload.test_event_code = TEST_EVENT_CODE;
  }

  try {
    console.log('📤 Sending TikTok CAPI Payload:', JSON.stringify(payload, null, 2));

    const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/event/track/', {
      method: 'POST',
      headers: {
        'Access-Token': ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (result.code !== 0) {
      console.error('❌ TikTok CAPI Error:', result.message, JSON.stringify(result.errors, null, 2));
    } else {
      console.log(`✅ TikTok Server Event [${eventName}] sent successfully.`);
    }
  } catch (error) {
    console.error('❌ Error sending TikTok Server Event:', error);
  }
}
