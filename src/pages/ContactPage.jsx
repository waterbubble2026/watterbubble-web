import { Link } from 'react-router-dom';

const ContactPage = () => {

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Checkboxes
    const interests = [];
    if (formData.get('interest_tanks')) interests.push('Bubble Tanks');
    if (formData.get('interest_tubes')) interests.push('Bubble Tubes');
    if (formData.get('interest_bwalls')) interests.push('Bubble Walls');
    if (formData.get('interest_wwalls')) interests.push('Water Walls');

    const msg = `*New Inquiry via Website*
    
*Name:* ${formData.get('firstName')} ${formData.get('surname')}
*Company:* ${formData.get('company')}
*Location:* ${formData.get('location')}
*Email:* ${formData.get('email')}
*Telephone:* ${formData.get('tel')}
*Mobile:* ${formData.get('mobile')}

*Interests:* ${interests.join(', ') || 'None'}

*Message/Brief:*
${formData.get('message')}

*(Note: The user attached an image on the website, please ask them to send it here).*`;

    const encodedMsg = encodeURIComponent(msg);
    window.open(`https://wa.me/918947032360?text=${encodedMsg}`, '_blank');
  };

  return (
    <div className="w-full flex flex-col flex-grow">
      {/* Hero Section */}
      <section 
        className="w-full relative bg-cover bg-center flex items-center justify-center pt-24 pb-12 md:pt-32 md:pb-24"
        style={{ backgroundImage: "url('/bubble-cover.png')", minHeight: '40vh' }}
      >
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
        <h1 className="relative z-10 text-white text-3xl md:text-5xl font-light tracking-wide uppercase text-center mt-12">
          CONTACT US
        </h1>
      </section>

      {/* Content Section */}
      <section className="w-full relative bg-[#f4f4f4] py-16 md:py-24">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}></div>
        
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10 flex flex-col">
          
          <h2 className="text-[#88cdeb] text-4xl md:text-5xl font-light mb-10">
            Water Bubble Walls
          </h2>

          {/* 3 Columns Text */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-600 text-sm leading-relaxed font-light mb-16">
            <div className="flex flex-col space-y-4">
              <p>
                At the heart of our business is a commitment to delivering exceptional customer service and outstanding workmanship on every project we undertake. We understand that choosing the right company for your project is an important decision, which is why we place such a strong emphasis on providing a personal, professional, and reliable service from start to finish.
              </p>
              <p>
                Unlike many larger organisations where <Link to="/projects" className="text-[#5ea2d8] hover:underline">projects</Link> are passed between different departments or managers, every project we complete is personally overseen by our team. Whether the project is a small domestic installation or a large scale commercial undertaking, we remain actively involved throughout the entire process. This hands-on approach ensures that every aspect of the project receives the attention it deserves and that our high standards are maintained at every stage.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <p>
                From the initial consultation and planning phase through to final delivery and installation, we work closely with our customers to understand their requirements, expectations, and objectives. By maintaining clear communication throughout the project, we are able to provide expert guidance, address any concerns promptly, and ensure that the finished result meets or exceeds expectations.
              </p>
              <p>
                We believe that personal involvement and accountability are key factors in delivering successful projects. Having a single point of contact overseeing the work provides our customers with confidence, consistency, and peace of mind, knowing that their project is being managed by someone who genuinely cares about the outcome.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <p>
                Our reputation has been built on quality, reliability, and customer satisfaction, and we take great pride in every project we complete. No matter the size, scope, or complexity of the work, our goal remains the same: to provide a seamless experience and deliver results of the highest possible standard.
              </p>
              <p>
                By combining expert knowledge, attention to detail, and a genuine commitment to customer service, we ensure that every project is completed efficiently, professionally, and to the satisfaction of our clients. This dedication to excellence is what sets us apart and continues to earn the trust of customers time and time again.
              </p>
            </div>
          </div>

          <h2 className="text-[#88cdeb] text-4xl md:text-5xl font-light mb-4">
            Contact
          </h2>
          <p className="text-gray-500 text-xs mb-8">* indicates required fields</p>

          {/* Form */}
          <form className="mb-20" onSubmit={handleWhatsAppSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" name="firstName" placeholder="First Name *" required className="w-full bg-white p-3 text-sm border-none focus:ring-1 focus:ring-[#88cdeb] outline-none rounded-sm shadow-sm" />
              <input type="text" name="surname" placeholder="Surname *" required className="w-full bg-white p-3 text-sm border-none focus:ring-1 focus:ring-[#88cdeb] outline-none rounded-sm shadow-sm" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" name="company" placeholder="Company Name" className="w-full bg-white p-3 text-sm border-none focus:ring-1 focus:ring-[#88cdeb] outline-none rounded-sm shadow-sm" />
              <input type="text" name="location" placeholder="Location" className="w-full bg-white p-3 text-sm border-none focus:ring-1 focus:ring-[#88cdeb] outline-none rounded-sm shadow-sm" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input type="email" name="email" placeholder="Email *" required className="w-full bg-white p-3 text-sm border-none focus:ring-1 focus:ring-[#88cdeb] outline-none rounded-sm shadow-sm" />
              <input type="tel" name="tel" placeholder="Telephone" className="w-full bg-white p-3 text-sm border-none focus:ring-1 focus:ring-[#88cdeb] outline-none rounded-sm shadow-sm" />
              <input type="tel" name="mobile" placeholder="Mobile *" required className="w-full bg-white p-3 text-sm border-none focus:ring-1 focus:ring-[#88cdeb] outline-none rounded-sm shadow-sm" />
            </div>
            <div className="mb-8">
              <textarea name="message" placeholder="Message / Project Brief *" required rows="6" className="w-full bg-white p-3 text-sm border-none focus:ring-1 focus:ring-[#88cdeb] outline-none rounded-sm shadow-sm resize-none"></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Interest Areas */}
              <div>
                <h4 className="font-bold text-sm text-gray-800 mb-4">Interest Areas</h4>
                <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" name="interest_tanks" className="form-checkbox text-[#5ea2d8] rounded-sm focus:ring-[#5ea2d8]" />
                    <span>Bubble Tanks</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" name="interest_tubes" className="form-checkbox text-[#5ea2d8] rounded-sm focus:ring-[#5ea2d8]" />
                    <span>Bubble Tubes</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" name="interest_bwalls" className="form-checkbox text-[#5ea2d8] rounded-sm focus:ring-[#5ea2d8]" />
                    <span>Bubble Walls</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" name="interest_wwalls" className="form-checkbox text-[#5ea2d8] rounded-sm focus:ring-[#5ea2d8]" />
                    <span>Water Walls</span>
                  </label>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <h4 className="font-bold text-sm text-gray-800 mb-4">If you have any drawings or images, please upload....</h4>
                <div className="flex items-center">
                  <input type="file" name="attachment" accept="image/*" className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300" />
                </div>
                <p className="text-[#5ea2d8] text-xs mt-4">Max. file size: 1 GB. (Only Images allowed)</p>
              </div>
            </div>

            <button type="submit" className="bg-[#5ea2d8] hover:bg-[#4a8fc3] text-white text-xs font-bold py-3 px-8 rounded-sm uppercase tracking-widest transition-colors shadow-md">
              SEND VIA WHATSAPP
            </button>
          </form>

          {/* Bottom Info Section */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start pb-8">
            <div className="w-full md:w-1/2">
              <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600" alt="Water features" className="w-full rounded-xl shadow-md object-cover h-64 md:h-80" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center h-full text-gray-600 text-sm font-light space-y-4">
              <p>
                For more information or to arrange a no obligation estimate please get in touch with us on <a href="tel:+918947032360" className="text-[#5ea2d8] hover:underline">+91 89470 32360</a>.
              </p>
              <div>
                <p className="font-bold text-gray-800">Water Bubble Walls</p>
                <p>Udaipur, Rajasthan, India</p>
                <p>
                  t: <a href="tel:+918947032360" className="hover:text-gray-800 transition-colors">+91 89470 32360</a> | <a href="mailto:info@waterbubblewalls.com" className="text-[#5ea2d8] hover:underline">info@waterbubblewalls.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
