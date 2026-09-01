# Project Setup Commands

## Create Multiple Folders Using Terminal (Windows)

Run this PowerShell command to create all required project folders at once:

```powershell
New-Item controllers, middlewares, models, routes, services, utils, validators -ItemType directory
```

**Note:** The command creates folders in the current working directory. Make sure you're in your project root folder first using `cd path/to/your/project`.

---

## Generate JWT Secret Using Terminal

### Step 1: Open Terminal
Open your terminal (Command Prompt, PowerShell, or any terminal in VS Code).

### Step 2: Generate Random Secret
Run the following Node.js command to generate a cryptographically secure 256-bit random string:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Example output:**
```
a7f3b8c9d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8
```
*(Your output will be different and unique)*

### Step 3: Copy the Generated String
Select and copy the entire 64-character hexadecimal string from the terminal output.

### Step 4: Set JWT Secret in .env File
Open your `.env` file (create one if it doesn't exist) and add:

```env
JWT_SECRET=paste-the-generated-string-here
```

**Example:**
```env
JWT_SECRET=a7f3b8c9d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8
```

---

## Security Best Practices

- ✅ **Never** hardcode secrets in your source code
- ✅ **Always** use environment variables for sensitive data
- ✅ **Add `.env`** to your `.gitignore` file to prevent accidental commits
- ✅ **Generate a new secret** for each project/environment (development, staging, production)
- ✅ **Use different secrets** for different environments

### Sample .gitignore entry:
```
.env
.env.local
.env.*.local
```

---

## Verification

To verify your JWT secret is properly set:

```bash
node -e "console.log(process.env.JWT_SECRET)"
```

Or check in your application:
```javascript
console.log(process.env.JWT_SECRET);
```
---

