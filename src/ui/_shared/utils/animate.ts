export function animate(
  element: HTMLElement,
  keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
  options?: number | KeyframeAnimationOptions
) {
  return new Promise((resolve) => {
    const anim = element.animate(keyframes, options);
    anim.onfinish = () => {
      resolve(true);
    };
  });
}
