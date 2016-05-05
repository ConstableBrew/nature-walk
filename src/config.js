
export const FPS  = 24;
export const STEP = 1/FPS;
export const WIDTH  = 1024; // Offscreen rendering size
export const HEIGHT = 768;  // Offscreen rendering size
export const RATIO  = HEIGHT / WIDTH;
export const BASE_LINE = HEIGHT * 0.667; // How far from the top the player will appear
export const BASE_MARGIN = WIDTH * 0.2; // How far from the left the player will appear
export const HORIZON = HEIGHT / 2; // Apparent position of the horizon on the screen
export const CAMERA_DISTANCE = 100; // Distance in feet that the camera is away form the plane of the player
export const CAMERA_ANGLE_DEG = 90;
export const FIELD_OF_VIEW = 2 * Math.sin(CAMERA_ANGLE_DEG / 2 * (Math.PI / 180)) * CAMERA_DISTANCE / Math.sin((180 - 90 - CAMERA_ANGLE_DEG / 2) * (Math.PI / 180)); // Visible area on the plane of the player
export const RUN_MAX_SPEED = -WIDTH * 5;
export const RUN_TIME_TO_MAX_SPEED = 5 * 60;
export const GRAVITY = 0*987;