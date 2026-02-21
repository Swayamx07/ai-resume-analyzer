export default function HeroBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden -z-10">

            {/* top gradient arc */}
            <div className="
        absolute
        w-[1200px]
        h-[1200px]
        rounded-full
        border
        border-red-500/20
        top-[-700px]
        left-1/2
        -translate-x-1/2
      " />

            {/* middle arc */}
            <div className="
        absolute
        w-[1400px]
        h-[1400px]
        rounded-full
        border
        border-yellow-400/20
        top-[-650px]
        left-1/2
        -translate-x-1/2
      " />

            {/* bottom arc */}
            <div className="
        absolute
        w-[1600px]
        h-[1600px]
        rounded-full
        border
        border-blue-500/20
        top-[-600px]
        left-1/2
        -translate-x-1/2
      " />

        </div>
    );
}