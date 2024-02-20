const usuarioGet = async (req, res) => {
    try {
        const usuario = await UserModel.find({id: req.params.id});
        if (usuario.length > 0)  {
            console.log('Usuario encontrado!');
            res.status(200).json(usuario);
        } else {
            console.log('Usuario no encontrado!');
            res.status(404).json({ 'msg': 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({ 'msg': 'Error al obtener usuario por ID' });
    }
}
