export function animate(
  element: HTMLElement,
  keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
  options?: number | KeyframeAnimationOptions
) {
  const anim = element.animate(keyframes, options);
  const promise = new Promise<boolean>((resolve) => {
    const onCancel = () => {
      resolve(true);
    };
    const onFinish = () => {
      resolve(false);
    };

    anim.oncancel = onCancel;
    anim.onfinish = onFinish;
  });

  return {
    promise,
    anim,
    cancel: () => {
      anim.cancel();
    },
  };
}
