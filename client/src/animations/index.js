export const animationOne = {
	in: {
		opacity: 1,
	},
	out: {
		opacity: 0,
	},
};

export const animationTwo = {
	in: {
		opacity: 1,
		y: 0,
		scale: 1,
	},
	out: {
		opacity: 0,
		y: '-80vh',
		scale: 0.8,
	},
};

export const animationFour = {
	in: {
		opacity: 1,
		y: -1,
		scale: 1,
	},
	out: {
		opacity: 0,
		y: '-80vh',
		scale: 0.8,
	},
};

export const animationThree = {
	in: {
		opacity: 1,
		x: -100,
	},
	out: {
		opacity: 0,
		x: 100,
	},
	end: {
		x: 0,
		opacity: 1,
	},
};

export const transition = {
	duration: 0.3,
};
