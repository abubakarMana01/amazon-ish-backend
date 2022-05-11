import { User, validateLogin, validateUser } from "@models/user";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (err: any) {
		res.status(500).json({ error: { message: err.message } });
		console.log(err.message);
	}
};

export const getUserInfo = async (req: any, res: Response) => {
	try {
		const user = await User.findById(req.user._id).select("-_id -password");
		res.status(200).json(user);
	} catch (err: any) {
		res.status(500).json({ error: { message: err.message } });
		console.log(err.message);
	}
};

export const registerUser = async (req: Request, res: Response) => {
	try {
		const { error } = validateUser(req.body);
		if (error)
			return res
				.status(400)
				.json({ error: { message: error.details[0].message } });

		// Check if user already exists before registering
		const userExists = await User.findOne({ email: req.body.email });
		if (userExists)
			return res
				.status(400)
				.json({ error: { message: "User already exists" } });

		// Hash password
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		// Create new user
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
			isAdmin: req.body.isAdmin,
		});

		await user.save();
		const token = user.generateAuthToken();
		res.header("x-auth-token", token).status(201).json({
			_id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		});
	} catch (err: any) {
		res.status(500).json({ error: { message: err.message } });
		console.log(err.message);
	}
};

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { error } = validateLogin(req.body);
		if (error)
			return res
				.status(400)
				.json({ error: { message: error.details[0].message } });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(404).json({ error: { message: "User not found" } });

		// Compare password with hashed
		const isValidPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!isValidPassword)
			return res.status(400).json({ error: { message: "Invalid password" } });

		const token = user.generateAuthToken();
		res
			.header("x-auth-token", token)
			.status(200)
			.json({ token, email: user.email });
	} catch (err: any) {
		res.status(500).json({ error: { message: err.message } });
		console.log(err.message);
	}
};
