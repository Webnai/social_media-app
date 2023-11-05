const verifying = jwt.verifying(token, process.env.JWT_SECRET);
req.user = verifying;
next();

export {}