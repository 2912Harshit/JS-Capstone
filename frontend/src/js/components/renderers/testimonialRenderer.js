function testimonialCard(testimonial) {
  return `
    <div
class="group
flex-none
w-[90%]
sm:w-[calc((100%-1rem)/2)]
lg:w-[calc((100%-2rem)/3)]
bg-white
rounded-[28px]
border
border-gray-200
p-7
transition-all
duration-300
hover:-translate-y-2
hover:shadow-xl
h-10px"
>

    <h3 class="font-bold text-xl">

        ${testimonial.title}

    </h3>

    <p
    class="mt-5
    text-gray-500
    leading-7
    text-[15px]
    h-28
    overflow-hidden"
    >

        ${testimonial.review}

    </p>

    <div
    class="mt-8
    md:flex
    items-center
    justify-between
    "
    >

        <div
        class="flex
        items-center
        gap-4"
        >

            <img
            src="${testimonial.avatar}"
            alt="avatar"
            class="w-14
            h-14
            rounded-full
            object-cover"
            >

            <div>

                <h4 class="font-semibold">

                    ${testimonial.name}

                </h4>

                <p class="text-sm text-gray-500">

                    ${testimonial.location}

                </p>

            </div>

        </div>

        <div
        class="flex
        text-yellow-400
        gap-1"
        >

            ★★★★★

        </div>

    </div>

</div>
  `;
}

export function renderTestimonials(slider, data) {
  data.forEach((card) => {
    slider.insertAdjacentHTML("beforeend", testimonialCard(card));
  });
}
