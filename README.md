# COSMIC Sites

COSMIC Sites is a complete multi-template business website system. It includes THREE ready-to-use business templates:
1. Salon/Beauty (purple theme)
2. Restaurant/Food (warm red theme)
3. General Shop/Retail (blue theme)

## Features

- Modern responsive homepage
- Services/Menu/Products section
- About section
- Contact form
- Floating WhatsApp button (configurable number)
- Google Maps embed section
- Mobile-first design

## Configuration

Each template includes a `config.js` file where you can customize:
- Business name, logo, colors
- WhatsApp number
- Services list
- Contact details

## Deployment to DigitalOcean

To deploy these static HTML/CSS/JS files to DigitalOcean, you can use the **DigitalOcean App Platform** or a **Basic Droplet**.

### Method 1: DigitalOcean App Platform (Easiest)

1. Push your repository to GitHub or GitLab.
2. Log in to your DigitalOcean account.
3. Click on **Create** -> **Apps**.
4. Select your Git provider (GitHub/GitLab) and choose the repository.
5. Select the branch you want to deploy (e.g., `main`).
6. DigitalOcean will automatically detect that this is a Static Site.
7. Click **Next** through the configurations, keeping the defaults.
8. Click **Create Resources** to deploy your site.
9. Your site will be available at a `.ondigitalocean.app` domain. You can map a custom domain in the App settings.

### Method 2: Basic Droplet with Nginx

1. Log in to DigitalOcean and create a new Droplet (Ubuntu 22.04/24.04 recommended).
2. SSH into your Droplet:
   ```bash
   ssh root@your_droplet_ip
   ```
3. Update packages and install Nginx:
   ```bash
   apt update
   apt install nginx -y
   ```
4. Copy your files to the server. You can use `scp` or `rsync` from your local machine:
   ```bash
   scp -r * root@your_droplet_ip:/var/www/html/
   ```
5. Ensure correct permissions:
   ```bash
   chown -R www-data:www-data /var/www/html/
   chmod -R 755 /var/www/html/
   ```
6. Your site should now be accessible by navigating to your Droplet's IP address in a web browser.
