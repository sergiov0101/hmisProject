node{
    stage('checkout'){
            checkout scm
    }
    stage('prueba'){
        sh 'echo "hello world"'
    }
    stage('git hook prueba'){
        sh 'echo "funciona el hook"'
    }
    stage('contruccion del proyecto'){
        sh 'docker-compose build'
    }
}
