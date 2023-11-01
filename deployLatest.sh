!#/usr/bin/bash
set -e
CONTAINER_NAME=level-sensor-dashboard
CYAN='\033[0;36m'
YELLOW='\033[0;33m'
GREEN='\033[0;32m'
NC='\033[0m'

echo "${CYAN}Pulling master from repository...${NC}"
git pull

echo "${CYAN}Building Docker container...${NC}"
docker build -t level-sensor-dashboard .


if [ "$(docker ps -a | grep -c $CONTAINER_NAME)" -gt 0 ]; then
    echo "${YELLOW}Stop and remove old container...${NC}"
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
    docker rmi $CONTAINER_NAME
    echo "${YELLOW}Old container removed${NC}"
fi

echo "${CYAN}Deploying fresh container...${NC}"
docker run --name $CONTAINER_NAME -dp 3000:3000 level-sensor-dashboard

echo "${GREEN}Deployed succesfully!${NC}"