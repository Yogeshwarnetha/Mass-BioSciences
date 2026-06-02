const env: any = "Production"; // Change to "dev" for development environment

export const origin = env == "dev" ? "http://localhost:4001" : "https://api.ratanvandassociates.com"

export const adminCookie = "faf61ac9d4fdb0000025bdf7375e4fc9020000"