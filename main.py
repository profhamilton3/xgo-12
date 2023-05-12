dx = 0
dy = 0
dz = 0
ux = 0
uy = 0
uz = 0
buf = bytearray(12)
radio.set_group(99)
basic.show_icon(IconNames.YES)
radio.set_transmit_power(3)
xgo.init_xgo_serial(SerialPin.P2, SerialPin.P1)

def on_forever():
    global buf, ux, dx, dy, dz, uy, uz
    buf = bytearray(12)
    
    ux = input.magnetic_force(Dimension.X)
    uy = input.magnetic_force(Dimension.Y)
    uz = input.magnetic_force(Dimension.Z)
    dx = input.acceleration(Dimension.X)
    dy = input.acceleration(Dimension.Y)
    dz = input.acceleration(Dimension.Z)

    
    buf.set_number(NumberFormat.INT16_LE, 0, ux)
    buf.set_number(NumberFormat.INT16_LE, 2, uy)
    buf.set_number(NumberFormat.INT16_LE, 4, uz)
    buf.set_number(NumberFormat.INT16_LE, 6, dx)
    buf.set_number(NumberFormat.INT16_LE, 8, dy)
    buf.set_number(NumberFormat.INT16_LE, 10, dz)
    if ux > uz:
        music.play_sound_effect(music.create_sound_effect(WaveShape.NOISE,
                54,
                54,
                255,
                0,
                500,
                SoundExpressionEffect.NONE,
                InterpolationCurve.LINEAR),
            SoundExpressionPlayMode.UNTIL_DONE)
    if uy > uz:
        music.play_sound_effect(music.create_sound_effect(WaveShape.NOISE,
                500,
                499,
                255,
                0,
                750,
                SoundExpressionEffect.NONE,
                InterpolationCurve.LINEAR),
            SoundExpressionPlayMode.UNTIL_DONE)
basic.forever(on_forever)

def on_every_interval():
    radio.send_buffer(buf)
loops.every_interval(3000, on_every_interval)
