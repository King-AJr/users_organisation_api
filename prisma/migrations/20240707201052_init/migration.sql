-- CreateTable
CREATE TABLE "users" (
    "userId" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "organizations" (
    "orgId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("orgId")
);

-- CreateTable
CREATE TABLE "_organizationsTousers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_organizationsTousers_AB_unique" ON "_organizationsTousers"("A", "B");

-- CreateIndex
CREATE INDEX "_organizationsTousers_B_index" ON "_organizationsTousers"("B");

-- AddForeignKey
ALTER TABLE "_organizationsTousers" ADD CONSTRAINT "_organizationsTousers_A_fkey" FOREIGN KEY ("A") REFERENCES "organizations"("orgId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_organizationsTousers" ADD CONSTRAINT "_organizationsTousers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
