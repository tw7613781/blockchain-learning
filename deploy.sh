#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="blockchain-learning"
COMPOSE_FILE="docker-compose.yml"
ENV_FILE=".env"

# Function to print colored messages
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
    print_info "Docker is running"
}

# Function to pull latest image
pull_image() {
    local version=$1
    print_info "Pulling image version: ${version}"
    docker pull ghcr.io/tw7613781/${PROJECT_NAME}:${version}
}

# Function to start services
start_services() {
    print_info "Starting services..."
    docker-compose -f ${COMPOSE_FILE} up -d
    print_info "Services started successfully"
}

# Function to stop services
stop_services() {
    print_info "Stopping services..."
    docker-compose -f ${COMPOSE_FILE} down
    print_info "Services stopped"
}

# Function to restart services
restart_services() {
    print_info "Restarting services..."
    docker-compose -f ${COMPOSE_FILE} restart
    print_info "Services restarted"
}

# Function to view logs
view_logs() {
    docker-compose -f ${COMPOSE_FILE} logs -f --tail=100
}

# Function to show status
show_status() {
    print_info "Service status:"
    docker-compose -f ${COMPOSE_FILE} ps
}

# Function to update to new version
update_version() {
    local version=$1
    
    if [ -z "$version" ]; then
        print_error "Version not specified"
        echo "Usage: $0 update <version>"
        echo "Example: $0 update v1.0.0"
        exit 1
    fi
    
    print_info "Updating to version: ${version}"
    
    # Update .env file
    if [ -f ${ENV_FILE} ]; then
        sed -i.bak "s/VERSION=.*/VERSION=${version}/" ${ENV_FILE}
    else
        echo "VERSION=${version}" > ${ENV_FILE}
    fi
    
    # Pull new image
    pull_image ${version}
    
    # Stop old containers
    stop_services
    
    # Start with new version
    start_services
    
    print_info "Update completed successfully!"
    show_status
}

# Function to cleanup old images
cleanup() {
    print_info "Cleaning up old images..."
    docker image prune -f
    print_info "Cleanup completed"
}

# Main script
case "$1" in
    start)
        check_docker
        start_services
        ;;
    stop)
        check_docker
        stop_services
        ;;
    restart)
        check_docker
        restart_services
        ;;
    logs)
        check_docker
        view_logs
        ;;
    status)
        check_docker
        show_status
        ;;
    update)
        check_docker
        update_version $2
        ;;
    pull)
        check_docker
        if [ -z "$2" ]; then
            print_error "Version not specified"
            echo "Usage: $0 pull <version>"
            exit 1
        fi
        pull_image $2
        ;;
    cleanup)
        check_docker
        cleanup
        ;;
    *)
        echo "Blockchain Learning Deployment Script"
        echo ""
        echo "Usage: $0 {start|stop|restart|logs|status|update|pull|cleanup}"
        echo ""
        echo "Commands:"
        echo "  start           - Start all services"
        echo "  stop            - Stop all services"
        echo "  restart         - Restart all services"
        echo "  logs            - View service logs (follow mode)"
        echo "  status          - Show service status"
        echo "  update <ver>    - Update to specified version"
        echo "  pull <ver>      - Pull specified image version"
        echo "  cleanup         - Remove unused Docker images"
        echo ""
        echo "Examples:"
        echo "  $0 start"
        echo "  $0 update v1.0.0"
        echo "  $0 logs"
        exit 1
        ;;
esac

exit 0
