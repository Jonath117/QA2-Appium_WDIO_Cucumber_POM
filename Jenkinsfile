pipeline {
    agent any
    
    // ⚠️ Importante: Define las variables de entorno de BrowserStack usando las credenciales de Jenkins
    environment {
        BROWSERSTACK_CREDS = credentials('BROWSERSTACK_CREDS')
    }

    stages {
        
        stage('Checkout') {
            steps {
                // Obtiene tu código fuente
                git url: 'https://github.com/Jonath117/QA2-Appium_WDIO_Cucumber_POM.git', branch: 'jenkins-pipeline'
            }
        }
        
        stage('Instalar Dependencias') {
            steps {
                bat 'npm install'
            }
        }
        
        stage('Ejecutar Pruebas BrowserStack') {
            steps {
                echo 'Ejecutando pruebas Appium/WDIO en BrowserStack...'
                
                // ⚠️ Se ejecuta WDIO, que automáticamente usará las variables BROWSERSTACK_USERNAME y BROWSERSTACK_ACCESS_KEY 
                // definidas en la sección 'environment' del pipeline.
                bat "set BROWSERSTACK_USERNAME=%BROWSERSTACK_CREDS_USR%&& set BROWSERSTACK_ACCESS_KEY=%BROWSERSTACK_CREDS_PSW%&& npx wdio run wdio.conf.js"
            }
        }
        
        stage('Generar Reporte Allure') {
            steps {
                // Si tienes un fallo, Allure genera los resultados.
                bat 'npx allure generate allure-results --clean -o allure-report'
            }
        }
    }
    
post {
    always {
        echo 'Publicando reporte Allure en Jenkins...'
        // Utiliza la sintaxis simple de Allure, con el path de la GENERACIÓN del reporte.
        // Aquí debes apuntar al directorio de salida que usaste arriba: 'allure-report'
        allure(report: 'allure-report', results: ['allure-results'])
    }
    failure {
        echo '¡Las pruebas fallaron!'
    }
    // ...
}
}