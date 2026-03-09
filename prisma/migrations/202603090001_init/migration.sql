CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');
CREATE TYPE "GradeCompany" AS ENUM ('PSA', 'BGS', 'CGC', 'RAW');
CREATE TYPE "ListingMode" AS ENUM ('TRADE', 'SALE', 'BOTH');
CREATE TYPE "TradeStatus" AS ENUM ('PROPOSED', 'NEGOTIATING', 'ACCEPTED', 'AWAITING_SHIPMENT', 'SHIPPED', 'RECEIVED_BY_TRADEHUB', 'AUTHENTICATION', 'COMPLETED', 'PAUSED_MISMATCH', 'CANCELLED');
CREATE TYPE "VerificationDecision" AS ENUM ('APPROVED', 'MISMATCH', 'REJECTED');

CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "rating" DECIMAL(2,1) NOT NULL DEFAULT 5.0,
    "strikes" INTEGER NOT NULL DEFAULT 0,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "setName" TEXT,
    "gradeCompany" "GradeCompany" NOT NULL,
    "gradeValue" TEXT,
    "conditionNote" TEXT,
    "estimatedValueCents" INTEGER NOT NULL,
    "description" TEXT,
    "frontImageUrl" TEXT NOT NULL,
    "backImageUrl" TEXT NOT NULL,
    "isForTrade" BOOLEAN NOT NULL DEFAULT false,
    "isForSale" BOOLEAN NOT NULL DEFAULT false,
    "listingMode" "ListingMode" NOT NULL DEFAULT 'BOTH',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TradeOffer" (
    "id" TEXT NOT NULL,
    "proposerId" TEXT NOT NULL,
    "counterpartyId" TEXT NOT NULL,
    "status" "TradeStatus" NOT NULL DEFAULT 'PROPOSED',
    "proposerCashCents" INTEGER NOT NULL DEFAULT 0,
    "counterpartyCashCents" INTEGER NOT NULL DEFAULT 0,
    "agreedValueCents" INTEGER,
    "proposerFeeCents" INTEGER,
    "counterpartyFeeCents" INTEGER,
    "proposerAccepted" BOOLEAN NOT NULL DEFAULT false,
    "counterpartyAccepted" BOOLEAN NOT NULL DEFAULT false,
    "trackingToHubProposer" TEXT,
    "trackingToHubCounterparty" TEXT,
    "trackingToNewOwnerProposer" TEXT,
    "trackingToNewOwnerCounterparty" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "TradeOffer_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TradeOfferCard" (
    "id" TEXT NOT NULL,
    "tradeOfferId" TEXT NOT NULL,
    "offeredByUserId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TradeOfferCard_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "VerificationReport" (
    "id" TEXT NOT NULL,
    "tradeOfferId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "reviewedByAdminId" TEXT NOT NULL,
    "decision" "VerificationDecision" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "VerificationReport_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Card" ADD CONSTRAINT "Card_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "TradeOffer" ADD CONSTRAINT "TradeOffer_proposerId_fkey" FOREIGN KEY ("proposerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "TradeOffer" ADD CONSTRAINT "TradeOffer_counterpartyId_fkey" FOREIGN KEY ("counterpartyId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "TradeOfferCard" ADD CONSTRAINT "TradeOfferCard_tradeOfferId_fkey" FOREIGN KEY ("tradeOfferId") REFERENCES "TradeOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TradeOfferCard" ADD CONSTRAINT "TradeOfferCard_offeredByUserId_fkey" FOREIGN KEY ("offeredByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "TradeOfferCard" ADD CONSTRAINT "TradeOfferCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "VerificationReport" ADD CONSTRAINT "VerificationReport_tradeOfferId_fkey" FOREIGN KEY ("tradeOfferId") REFERENCES "TradeOffer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "VerificationReport" ADD CONSTRAINT "VerificationReport_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "VerificationReport" ADD CONSTRAINT "VerificationReport_reviewedByAdminId_fkey" FOREIGN KEY ("reviewedByAdminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
