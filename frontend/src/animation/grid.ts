export const firstState = {
  y: "0vh",
};

export const scrollTriggerOptions = (trigger, start, end) => ({
  trigger,
  start,
  end,
  markers: true,
  scrub: true,
});

export const lastState = (trigger, start, end) => ({
  y: "-=25vh",
  // scale: 0.5,
  // ease: Sine.easeOut,
  stagger: {
    each: 20,
    amount: 0.25,
    from: "start",
    // ease: Sine.easeInOut
  },
  scrollTrigger: scrollTriggerOptions(trigger, start, end),
});
