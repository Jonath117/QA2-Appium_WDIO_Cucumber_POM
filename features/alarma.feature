
Feature: Gestión de alarmas
Background:
    Given Estoy en la pestaña de alarmas


  @deleteAlarmIndependiente
  Scenario: Eliminar una alarma existente
    When Creo una alarma a las "9" horas y "30" minutos
    Then La alarma a las "9":"30" debería estar visible
    When Elimino la alarma a las "9":"30"
    Then La alarma a las "9":"30" no debería existir  