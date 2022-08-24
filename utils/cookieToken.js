exports.cookieToken = async(user, res) => {
    // create or generate a token
    const token = await user.getJwtToken();

    // cookie options
    const options = {
        expires: new Date(
            Date.now() + 3 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    user.password = undefined;
    res.status(200).cookie('token', token, options).json({status: 'success', token, user});
}