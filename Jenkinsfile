#!groovy

pipeline {
    agent { node { label 'master' } }

    stages {
        stage("Prepare") {
            steps {
                githubNotify status: "PENDING", description: "Build is starting...", credentialsId: "Github", account: "hhhhuy112", repo: "ActionCable_ChatApp", sha: "3c0a6c6"
            }
        }
        stage("Build and start test image") {
            steps {
                bat """
                    docker-compose -f docker-compose-pipeline.yml build
                    docker-compose -f docker-compose-pipeline.yml up -d
                """
            }
        }

        stage("Run tests") {
            steps {
                bat """
                    docker-compose --project-name=${JOB_NAME} run web bundle exec rspec spec
                    docker-compose --project-name=${JOB_NAME} run web bundle exec rubocop
                """
            }
        }
    }
}

