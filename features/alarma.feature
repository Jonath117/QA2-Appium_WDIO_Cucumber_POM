
Feature: Gestión de alarmas
Background:
    Given Estoy en la pestaña de alarmas


  @deleteAlarmIndependiente
  Scenario: Crear y eliminar una alarma independiente
    When Creo una alarma a las "11" horas y "30" minutos
    Then La alarma a las "11":"30" debería estar visible
    When Elimino la alarma a las "11":"30"
    Then La alarma a las "11":"30" no debería existir  