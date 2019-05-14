node{
    stage('checkout'){
            checkout scm
    }
    stage('prueba'){
        sh 'echo "hello world"'
    }
    stage('git hook prueba 2'){
        sh 'echo "funciona el hook"'
    }
    stage('contruccion'){
        sh 'docker-compose build'
    }
    stage('Levantamos'){
        sh 'docker-compose -f docker-compose.yml up --force-recreate --abort-on-container-exit"'
    }
}