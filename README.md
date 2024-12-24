
# Party Hierarchy Project With SQL And Prisma ORM

This is small case study in Node.js with an Express server, Prisma ORM, and Swagger documentation for managing a hierarchy of "parties". It includes CRUD operations, cascading deletes for dependent children, and hierarchical queries.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:
- **Node.js**: Version 14 or higher
- **npm**: Comes with Node.js

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure the Environment**
   Create a `.env` file in the root directory and add your MySQL connection string:
   ```env
   PORT=3000
   DATABASE_URL="mysql://user:password@localhost:3306/party_hierarchy"
   ```
4. **Initialize Prisma**
   Initialize Prisma to set up your project:
   ```bash
   npx prisma init
   ```


5. **Apply Migrations**
   Use Prisma to create and apply database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

6. **Seed the Database**
   Run the seed script to populate the database with sample data:
   ```bash
   npm run seed-db
   ```

7. **Run the Application**
   Start the development server:
   ```bash
   npm start
   ```
   The server will run at `http://localhost:3000`.

---

## Prisma Overview

### What is Prisma?

Prisma is a modern ORM (Object-Relational Mapping) tool for Node.js and TypeScript. It simplifies database access by providing a type-safe and intuitive API.

### Key Advantages
- **Type Safety**: Automatically generates TypeScript types for your database models.
- **Developer Productivity**: Simplifies database operations with intuitive queries.
- **Migration Management**: Provides tools to handle schema migrations.
- **Flexibility**: Supports complex relationships and modern database features.

---

## Prisma Commands

| Command                       | Description                                                                                                   | Example Usage                            |
|-------------------------------|---------------------------------------------------------------------------------------------------------------|------------------------------------------|
| **npx prisma init**           | Initializes a Prisma project by creating the \`prisma/schema.prisma\` file and a \`.env\` file for configuration. | \`npx prisma init\`                      |
| **npx prisma generate**       | Generates the Prisma Client based on the \`schema.prisma\` file. This command is automatically run after migrations. | \`npx prisma generate\`                  |
| **npx prisma migrate dev**    | Creates a new migration and applies it to the database. Also runs \`prisma generate\` to regenerate the Prisma Client. | \`npx prisma migrate dev --name init\`   |
| **npx prisma migrate deploy** | Applies all pending migrations in a production environment without modifying the database schema file.          | \`npx prisma migrate deploy\`            |
| **npx prisma migrate reset**  | Resets the database by rolling back all migrations, then reapplying them. Useful in development.                | \`npx prisma migrate reset\`             |
| **npx prisma db pull**        | Introspects an existing database schema and updates the \`schema.prisma\` file to reflect it.                   | \`npx prisma db pull\`                   |
| **npx prisma db push**        | Pushes the changes in \`schema.prisma\` to the database without creating a migration. Useful for prototyping.   | \`npx prisma db push\`                   |
| **npx prisma studio**         | Opens the Prisma Studio, a GUI to explore and edit your database.                                              | \`npx prisma studio\`                    |
| **npx prisma validate**       | Validates the \`schema.prisma\` file to check for errors.                                                      | \`npx prisma validate\`                  |
| **npx prisma format**         | Formats the \`schema.prisma\` file to match Prisma's formatting standards.                                      | \`npx prisma format\`                    |




