# Deployment Guide - The Grocer Control Tower

This guide covers deploying the Angular frontend as static files and the .NET backend via Docker.

## Prerequisites

- Ubuntu/Debian server with sudo access
- Domain name pointed to your server
- Docker and Docker Compose installed

## Part 1: Build Angular Frontend

### On Your Local Machine:

```bash
cd frontend-angular

# Install dependencies (if not already done)
npm install

# Build for production
npm run build -- --configuration=production
```

This creates the `dist/frontend-angular/browser/` folder with optimized static files.

## Part 2: Deploy to Server

### 1. Install Nginx (if not already installed)

```bash
sudo apt update
sudo apt install nginx -y
```

### 2. Create Web Directory

```bash
sudo mkdir -p /var/www/control-tower
sudo chown -R $USER:$USER /var/www/control-tower
```

### 3. Upload Built Files

From your local machine:

```bash
# Using SCP
scp -r dist/frontend-angular/browser/* user@your-server:/home/ubuntu/Control-tower/frontend-angular/dist/frontend-angular/browser/

# Or using rsync (recommended)
rsync -avz --delete dist/frontend-angular/browser/ user@your-server:/home/ubuntu/Control-tower/frontend-angular/dist/frontend-angular/browser/
```

### 4. Configure Nginx

```bash
# Copy the nginx configuration
sudo cp nginx-site.conf /etc/nginx/sites-available/control-tower

# Edit the configuration to add your domain
sudo nano /etc/nginx/sites-available/control-tower
# Replace 'your-domain.com' with your actual domain

# Enable the site
sudo ln -s /etc/nginx/sites-available/control-tower /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## Part 3: Setup HTTPS with Let's Encrypt

### 1. Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 2. Obtain SSL Certificate

```bash
sudo certbot --nginx -d your-domain.com
```

Follow the prompts:
- Enter your email
- Agree to terms
- Choose whether to redirect HTTP to HTTPS (recommended: Yes)

Certbot will automatically:
- Obtain the certificate
- Update your Nginx configuration
- Set up auto-renewal

### 3. Verify Auto-Renewal

```bash
sudo certbot renew --dry-run
```

## Part 4: Deploy Backend

### 1. Clone Repository (if not done)

```bash
cd ~
git clone https://github.com/johnsamey/Control-tower.git
cd Control-tower
```

### 2. Start Backend Container

```bash
docker-compose up -d --build
```

### 3. Verify Backend is Running

```bash
docker ps
# Should show grocer-backend running on port 8080

# Test API
curl http://localhost:8080/api/hierarchy
```

## Part 5: Verify Everything Works

1. Visit `https://your-domain.com` - should load the Angular app
2. Check browser console - no errors
3. Test API calls - should work through Nginx proxy

## Updating the Application

### Update Frontend:

```bash
# On local machine
cd frontend-angular
npm run build -- --configuration=production

# Upload to server
rsync -avz --delete dist/frontend-angular/browser/ user@your-server:/home/ubuntu/Control-tower/frontend-angular/dist/frontend-angular/browser/
```

### Update Backend:

```bash
# On server
cd ~/Control-tower
git pull origin main
docker-compose up -d --build
```

## Troubleshooting

### Check Nginx Logs:
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Check Backend Logs:
```bash
docker logs grocer-backend
```

### Restart Services:
```bash
# Nginx
sudo systemctl restart nginx

# Backend
docker-compose restart
```

## Security Checklist

- ✅ HTTPS enabled
- ✅ HTTP redirects to HTTPS
- ✅ Security headers configured
- ✅ Gzip compression enabled
- ✅ Static asset caching configured
- ⚠️ Configure firewall (UFW):
  ```bash
  sudo ufw allow 'Nginx Full'
  sudo ufw allow 22
  sudo ufw enable
  ```

## Multiple Applications on Same Server

Since you have other applications running, ensure:

1. Each app uses a different domain/subdomain
2. Each Nginx site config is in `/etc/nginx/sites-available/`
3. Enabled via symlink in `/etc/nginx/sites-enabled/`
4. Backend containers use different ports (8080, 8081, etc.)

Example for multiple apps:
```
app1.example.com → /var/www/app1 → proxy to localhost:8080
app2.example.com → /var/www/app2 → proxy to localhost:8081
```
