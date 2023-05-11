let ut = 0
radio.setGroup(99)
basic.showIcon(IconNames.Heart)
radio.setTransmitPower(5)
xgo.init_xgo_serial(SerialPin.P2, SerialPin.P1)
basic.forever(function () {
    basic.showIcon(IconNames.Surprised)
    ut = input.magneticForce(Dimension.X)
    if (input.magneticForce(Dimension.X) > 50) {
        basic.showIcon(IconNames.Angry)
        xgo.execution_action(xgo.action_enum.Request_feeding)
        soundExpression.giggle.playUntilDone()
    } else {
        basic.showIcon(IconNames.Confused)
        xgo.execution_action(xgo.action_enum.Crawl_forward)
        soundExpression.yawn.playUntilDone()
    }
})
loops.everyInterval(3000, function () {
    radio.sendValue("name", ut)
    soundExpression.hello.playUntilDone()
})
