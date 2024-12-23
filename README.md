Here’s a polished version of your GitHub-friendly README file. The formatting ensures proper headers, code blocks, and presentation:

---

# Kafka App

This repository contains a Kafka.js setup that demonstrates the use of Kafka for message streaming and processing. The project includes an admin, producer, and consumer, along with a Docker setup for Zookeeper, Kafka, and Kafka UI.

---

## Table of Contents

1. [Overview](#overview)  
2. [Prerequisites](#prerequisites)  
3. [Installation](#installation)  
4. [Docker Setup](#docker-setup)  
5. [Files Overview](#files-overview)  
6. [GitHub Repository](#github-repository)  

---

## Overview

This project showcases a Kafka-based setup, including:

- **Admin**: Initializes Kafka, creates topics, and manages configurations.  
- **Producer**: Sends messages to Kafka topics dynamically based on location.  
- **Consumer**: Subscribes to topics and processes messages.  
- **Docker Setup**: Includes Zookeeper, Kafka, and Kafka UI for visualization.  

---

## Prerequisites

Ensure the following are installed on your system:

- **Node.js**: Version 14 or higher.  
- **Docker & Docker Compose**: To containerize and manage services.  

---

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/Abhi16016/kafka-app.git
cd kafka-app
npm install kafkajs
```

---

## Docker Setup

Create a `docker-compose.yml` file in the root directory with the following content:

```yaml
version: "3"

services:
  zookeeper:
    image: zookeeper
    container_name: zookeeper
    ports:
      - "2181:2181"

  kafka:
    image: confluentinc/cp-kafka
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    expose:
      - "29092"
    environment:
      KAFKA_ZOOKEEPER_CONNECT: "zookeeper:2181"
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: "1"
      KAFKA_MIN_INSYNC_REPLICAS: "1"

  kafka-ui:
    container_name: kafka-ui
    image: provectuslabs/kafka-ui
    ports:
      - "8080:8080"
    environment:
      DYNAMIC_CONFIG_ENABLED: true
```

Start the services:

```bash
docker-compose up -d
```

Verify the containers are running:

```bash
docker ps
```

Access Kafka UI at `http://localhost:8080`.

---

## Files Overview

- **`admin.ts`**: Initializes Kafka admin, creates a topic (`rider-updates`), and manages configurations.  
- **`client.ts`**: Exports a reusable Kafka client for producers and consumers.  
- **`producer.ts`**: Sends messages to the `rider-updates` topic.  
- **`consumer.ts`**: Subscribes to the `rider-updates` topic and logs incoming messages.  

---

## GitHub Repository

The code for this project is available at: [Kafka App GitHub Repository](https://github.com/Abhi16016/kafka-app)

---
