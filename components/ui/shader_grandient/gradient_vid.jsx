export default function GradientVideo() {
   return (
      <video
         autoPlay
         muted
         loop
         playsInline
         className="absolute left-0 top-0 z-[-1] size-full object-cover"
      >
         <source src="/assets/gradient.mp4" type="video/webm" />
      </video>
   );
}
