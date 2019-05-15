node{
    stage('checkout del repositorio git'){
            checkout scm
    }
    stage('Elimino contenedores antiguos'){
        try{
            sh 'docker rm $(docker ps -a -q)'
        }
        catch{
            echo 'No hay contenedores que eliminar'
        }
    }
    stage('Contruccion del proyecto'){
        sh 'docker-compose build'
    }
        stage('Levantar contenedores'){
        sh 'docker-compose up -d'
    }

}
