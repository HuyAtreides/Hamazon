FROM openjdk:11-jdk-oracle

WORKDIR /usr/hamazon/back-end

COPY ./target/hamazon-0.0.1-SNAPSHOT.jar ./

COPY ./start-server.sh ./

CMD ["/bin/bash", "./start-server.sh"]