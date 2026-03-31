pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS18'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Docker Build') {
            steps {
                script {
                    docker.build("disaster-safety-frontend:${env.BUILD_NUMBER}")
                }
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to production...'
                // TODO: 배포 스크립트 추가
            }
        }
    }
    
    post {
        success {
            echo 'Frontend CI/CD 성공!'
        }
        failure {
            echo 'Frontend CI/CD 실패!'
        }
    }
}
