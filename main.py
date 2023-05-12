
dx = 0
dy = 0
dz = 0
ux = 0
uy = 0
uz = 0
buf = bytearray(12)
radio.set_group(99)
basic.show_icon(IconNames.HEART)
radio.set_transmit_power(7)
xgo.init_xgo_serial(SerialPin.P2, SerialPin.P1)

def on_forever():
    global buf, ux, uy, uz, dx, dy, dz
    buf = bytearray(8)
    ux = input.magnetic_force(Dimension.X)
    dx = input.acceleration(Dimension.X)
    dy = input.acceleration(Dimension.Y)
    dz = input.acceleration(Dimension.Z)
    basic.show_icon(IconNames.SURPRISED)
    ux = input.magnetic_force(Dimension.X)
    uy = input.magnetic_force(Dimension.Y)
    uz = input.magnetic_force(Dimension.Z)
    buf.set_number(NumberFormat.INT16_LE, 0, ux)
    buf.set_number(NumberFormat.INT16_LE, 2, ux)
    buf.set_number(NumberFormat.INT16_LE, 4, ux)
    buf.set_number(NumberFormat.INT16_LE, 6, dx)
    buf.set_number(NumberFormat.INT16_LE, 8, dy)
    buf.set_number(NumberFormat.INT16_LE, 12, dz)
    if input.magnetic_force(Dimension.Z) > 10:
        basic.show_icon(IconNames.HAPPY)
        xgo.execution_action(xgo.action_enum.REQUEST_FEEDING)
        soundExpression.giggle.play_until_done()
    else:
        basic.show_icon(IconNames.CONFUSED)
        xgo.execution_action(xgo.action_enum.CRAWL_FORWARD)
        music.play_sound_effect(music.create_sound_effect(WaveShape.SQUARE,
                4585,
                4529,
                255,
                0,
                79,
                SoundExpressionEffect.NONE,
                InterpolationCurve.LOGARITHMIC),
            SoundExpressionPlayMode.UNTIL_DONE)
basic.forever(on_forever)

def on_every_interval():
    radio.send_buffer(buf)
    music.play_sound_effect(music.create_sound_effect(WaveShape.TRIANGLE,
            300,
            200,
            255,
            0,
            75,
            SoundExpressionEffect.NONE,
            InterpolationCurve.CURVE),
        SoundExpressionPlayMode.UNTIL_DONE)
loops.every_interval(3000, on_every_interval)
