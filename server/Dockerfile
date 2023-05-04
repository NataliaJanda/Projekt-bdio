FROM alpine:latest

RUN apk update && \
    apk add --no-cache openjdk17 && \
    apk add --no-cache curl && \
    rm -rf /var/cache/apk/*

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk
ENV PATH=$PATH:$JAVA_HOME/bin

WORKDIR /app

# Copy the Gradle files and source code
COPY . .
# Start the app
CMD ./gradlew build && java -jar build/libs/server-1.0-SNAPSHOT.jar



