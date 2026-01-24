-- CreateTable
CREATE TABLE "CookieLog" (
    "id" SERIAL NOT NULL,
    "visitorId" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CookieLog_pkey" PRIMARY KEY ("id")
);
