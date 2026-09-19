import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const ReviewsSection = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 3000, stopOnInteraction: false })
  ]);

  const baseReviews = [
    {
      name: 'Jitendra Singh',
      time: '2 months ago',
      avatar: 'J',
      avatarBg: 'bg-[#407B43]', // Greenish
      text: 'Great work and communication from the Ninja Lights & Designs team. हमारा नया Water Wall feature बहुत ही शानदार लग रहा है। Would highly recommend!',
    },
    {
      name: 'Priya Shekhawat',
      time: '4 months ago',
      avatarImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100', // Placeholder
      text: 'Delivery ekdum time par hui and as promised, we love the finished results. The new Bubble Tubes in our clinic look amazing. उनका काम सच में काबिले तारीफ है। Thank you!',
    },
    {
      name: 'Anjali Jain',
      time: '6 months ago',
      avatarImg: 'https://images.unsplash.com/photo-1554727242-741c14fa561c?auto=format&fit=crop&q=80&w=100', // Placeholder
      text: 'We had a custom Bubble Wall installed in our Udaipur office. Team worked professionally with delivery and installation. इंस्टॉलेशन एकदम परफेक्ट थी और क्वालिटी बहुत प्रीमियम है...',
    },
    {
      name: 'Dinesh Sharma',
      time: '8 months ago',
      avatar: 'D',
      avatarBg: 'bg-[#7B5E57]', // Brownish
      text: 'Very efficient service! हमने अपने घर के मंदिर के लिए custom Lord Wall बनवाई थी। Did the job ahead of the original schedule and it looks absolutely divine...',
    }
  ];

  // Duplicate to allow smooth looping
  const reviews = [...baseReviews, ...baseReviews];

  return (
    <section className="w-full bg-[#f4f4f4] relative flex items-center justify-center overflow-hidden max-h-[50vh] min-h-[400px]">
      {/* Subtle Dot Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}></div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10 w-full flex items-center">
        {/* Left Arrow (for visual consistency with design, could be made functional if needed) */}
        <button className="hidden lg:flex absolute left-2 md:left-4 bg-white rounded-full p-2 shadow-sm hover:bg-gray-50 z-20 w-8 h-8 items-center justify-center text-gray-500 border border-gray-100">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        <div className="overflow-hidden w-full lg:px-12" ref={emblaRef}>
          <div className="flex -ml-6">
            {reviews.map((review, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_25%] pl-6">
                <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col h-full border border-gray-100 relative min-h-[260px]">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      {review.avatarImg ? (
                        <img src={review.avatarImg} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg ${review.avatarBg}`}>
                          {review.avatar}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm leading-tight">{review.name}</h4>
                        <span className="text-gray-500 text-xs">{review.time}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      {/* Google G logo */}
                      <svg viewBox="0 0 24 24" className="w-5 h-5">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                    </div>
                  </div>

                  {/* Stars & Verification Check */}
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <svg key={idx} className="w-4 h-4 text-[#FBBC05] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                    {/* Verified Checkmark */}
                    <svg className="w-4 h-4 text-[#4285F4] fill-current ml-1" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>

                  {/* Text */}
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-4 flex-grow">
                    {review.text}
                  </p>

                  {/* Read more */}
                  <a href="#" className="text-[#a0a0a0] hover:text-gray-700 text-xs mt-auto inline-block">Read more</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
