# Blockchain Learning Deployment Guide

## Prerequisites

- Docker and Docker Compose installed on Ubuntu server
- GitHub account with Container Registry enabled
- Port 3000 available on server

## Initial Setup

1. Clone the deployment files to your server:

```bash
git clone https://github.com/tw7613781/blockchain-learning.git
cd blockchain-learning
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Make deploy script executable:

```bash
chmod +x deploy.sh
```

## Deployment Commands

### Start the application

```bash
./deploy.sh start
```

### Update to a new version

```bash
./deploy.sh update v1.0.0
```

### View logs

```bash
./deploy.sh logs
```

### Check status

```bash
./deploy.sh status
```

### Stop the application

```bash
./deploy.sh stop
```

### Restart the application

```bash
./deploy.sh restart
```

### Cleanup old images

```bash
./deploy.sh cleanup
```

## Release Workflow

1. **Create a new tag locally:**

```bash
git tag v1.0.0
git push origin v1.0.0
```

2. **GitHub Actions automatically:**
   - Builds the Docker image
   - Pushes to GitHub Container Registry
   - Image available at: `ghcr.io/tw7613781/blockchain-learning:v1.0.0`

3. **Update on server:**

```bash
./deploy.sh update v1.0.0
```

## Docker Image Location

Images are stored in GitHub Container Registry:

```
ghcr.io/tw7613781/blockchain-learning:latest
ghcr.io/tw7613781/blockchain-learning:v1.0.0
```

## Access

Once deployed, access the application at:

```
http://your-server-ip:3000
```

## Port Configuration

The application runs on port **3000** by default. To change:

1. Edit `docker-compose.yml`:
   ```yaml
   ports:
     - "8080:80"  # Change 3000 to your preferred port
   ```

2. Restart the service:
   ```bash
   ./deploy.sh restart
   ```

## Nginx Configuration (Optional)

If you want to use a domain name and HTTPS, configure nginx on the host:

```nginx
server {
    listen 80;
    server_name learning.tangwei.uk;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Then use certbot for HTTPS:

```bash
certbot --nginx -d learning.tangwei.uk
```

## Troubleshooting

### Check container status

```bash
docker ps
```

### View container logs

```bash
docker logs blockchain-learning
```

### Restart Docker service

```bash
sudo systemctl restart docker
```

### Remove all containers and images

```bash
docker-compose down
docker system prune -a
```
