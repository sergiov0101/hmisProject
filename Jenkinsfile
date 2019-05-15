node{
    stage('checkout'){
            checkout scm
    }
    stage('prueba'){
        sh 'echo "hello world"'
    }
    stage('git hook'){
        sh 'echo "funciona el hook8"'
    }
    stage('Contruccion del proyecto'){
        sh 'docker-compose build'
    }
        stage('Levanto contenedores'){
        sh 'docker-compose up -d'
    }

}
