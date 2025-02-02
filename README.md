# HW02 - Interactive Pattern Generation with Hand Detection

An interactive pattern generation experiment combining p5.js, ml5.js, and hand tracking technology.

## Project Description

This project combines computer vision with generative art, creating unique visual effects through user hand gestures. The project is built upon several core elements:

1. Gesture Recognition: Using ml5.js's handpose model to track the index fingertip (keypoint 8)
2. Pattern Generation: Reusing random pattern generation logic from previous Creative Coding assignments (HW04 and HW13)
3. Interaction Design: Minimizing the camera view to the top-left corner while mapping finger positions to the entire canvas space

## Technical Implementation

- Real-time hand tracking using the handpose model
- Coordinate mapping from camera space to canvas space using p5.js map() function
- Combined automatic and manual control mechanisms for pattern generation

## Development Challenges and Solutions

1. Coordinate Mapping Issue:
   - Initially, patterns were only generated within the camera view area
   - Solved by implementing coordinate mapping to utilize the full canvas

2. Visual Feedback:
   - Reduced camera view to top-left corner to maintain clean interface
   - Added green indicator dot in camera view for user position reference

## Future Improvements

- Add more gesture controls, such as switching pattern styles with different gestures
- Consider adding pattern saving functionality
- Optimize pattern generation algorithms for richer visual effects

## Process Notess

I started by modifying the code from the WK02 repository to only detect the index fingertip, focusing on keypoint 8 in the handpose model. Then, I incorporated the visual patterns from my Creative Coding assignments HW04 and HW13. Initially, the patterns were only following the finger trajectory within the camera view, but I wanted the camera view to occupy just a small portion of the canvas. This led to implementing coordinate mapping from the camera space to the full canvas space.
