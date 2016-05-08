
export const FPS  = 24;
export const STEP = 1/FPS;
export const WIDTH  = 1024; // Offscreen rendering size
export const HEIGHT = 768;  // Offscreen rendering size
export const METER  = 24;   // Pixels per meter
export const RATIO  = HEIGHT / WIDTH;
export const PLAYER_LEFT = WIDTH * 0.2; // How far from the left the player will appear
export const PLAYER_TOP = HEIGHT * 0.8; // How far from the top the player will appear
export const HORIZON = HEIGHT * 1; // Apparrent position of the horizon on the screen
export const CAMERA_DISTANCE = 50; // Distance in meters that the camera is away form the plane of the player
export const CAMERA_ANGLE_DEG = 90;
export const FIELD_OF_VIEW = 2 * Math.sin(CAMERA_ANGLE_DEG / 2 * (Math.PI / 180)) * CAMERA_DISTANCE / Math.sin((180 - 90 - CAMERA_ANGLE_DEG / 2) * (Math.PI / 180)); // Visible area on the plane of the player
export const RUN_START_SPEED = 10 * METER;
export const RUN_MAX_SPEED = 200; // meters per second (12.4 m/s is the world record)
export const RUN_TIME_TO_MAX_SPEED = 6 * 60;
export const GRAVITY = 0*-9.8;