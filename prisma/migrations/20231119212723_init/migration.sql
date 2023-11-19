-- CreateTable
CREATE TABLE "Connection" (
    "connectionId" TEXT NOT NULL,
    "userIdOne" TEXT NOT NULL,
    "userIdTwo" TEXT NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("connectionId")
);

-- CreateTable
CREATE TABLE "ConnectionLink" (
    "connectionId" TEXT NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConnectionLink_pkey" PRIMARY KEY ("connectionId")
);

-- CreateTable
CREATE TABLE "Prompt" (
    "connectionId" TEXT NOT NULL,
    "promptId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("promptId")
);

-- CreateTable
CREATE TABLE "Response" (
    "responseId" TEXT NOT NULL,
    "promptId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("responseId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prompt_promptId_key" ON "Prompt"("promptId");

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("promptId") ON DELETE RESTRICT ON UPDATE CASCADE;
