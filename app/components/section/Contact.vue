<template>
  <section id="contact" class="relative text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2
      class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center
           bg-gradient-to-r from-cyan-500 to-teal-500
           bg-clip-text text-transparent mb-8 sm:mb-12 md:mb-16"
    >
      &lt; Get in Touch /&gt;
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
      <!-- Contact Info -->
      <div class="space-y-4 sm:space-y-6 order-2 lg:order-1">
        <div class="relative group">
          <div class="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative bg-gradient-to-br from-[#1a1a1a] to-[#111111] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 group-hover:border-cyan-500/50 transition-all duration-500">
            <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">Let's work together</h2>
            <p class="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6">
              Have a project in mind or want to collaborate? Feel free to reach out. I'm always open to discussing new opportunities and ideas.
            </p>

            <!-- Contact Details -->
            <div class="space-y-3 sm:space-y-4">
              <a href="mailto:dasssanik124102@gmail.com" class="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-cyan-400 transition-colors group/item">
                <div class="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:bg-cyan-500/30 transition-colors">
                  <Icon name="mdi:email-outline" class="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
                </div>
                <span class="text-xs sm:text-sm md:text-base break-all">dasssanik124102@gmail.com</span>
              </a>

              <a href="tel:+8801521215839" class="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-cyan-400 transition-colors group/item">
                <div class="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:bg-cyan-500/30 transition-colors">
                  <Icon name="mdi:phone-outline" class="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
                </div>
                <span class="text-xs sm:text-sm md:text-base">+880 1521 215 839</span>
              </a>

              <a href="https://wa.me/8801521215839" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-cyan-400 transition-colors group/item">
                <div class="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:bg-cyan-500/30 transition-colors">
                  <Icon name="mdi:whatsapp" class="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
                </div>
                <span class="text-xs sm:text-sm md:text-base">WhatsApp</span>
              </a>

              <div class="flex items-center gap-2 sm:gap-3 text-gray-300">
                <div class="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="mdi:map-marker-outline" class="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
                </div>
                <span class="text-xs sm:text-sm md:text-base">Bangladesh</span>
              </div>
            </div>

            <!-- Social Links -->
            <div class="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
              <p class="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">Connect with me</p>
              <div class="flex gap-2 sm:gap-3">
                <a
                  v-for="(social, i) in socialLinks"
                  :key="i"
                  :href="social.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-9 h-9 sm:w-10 sm:h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
                  :aria-label="social.label"
                >
                  <Icon :name="social.icon" class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-cyan-400 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="relative group order-1 lg:order-2">
        <div class="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="relative bg-gradient-to-br from-[#1a1a1a] to-[#111111] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 group-hover:border-cyan-500/50 transition-all duration-500">
          <form @submit.prevent="sendEmail" class="space-y-3 sm:space-y-4 md:space-y-5">
            <!-- Name & Email Row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label for="name" class="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">Your Name</label>
                <input
                  v-model="form.name"
                  type="text"
                  id="name"
                  required
                  placeholder="Enter your name"
                  class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                />
              </div>
              <div>
                <label for="email" class="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">Your Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  id="email"
                  required
                  placeholder="Enter your email"
                  class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                />
              </div>
            </div>

            <!-- Subject -->
            <div>
              <label for="subject" class="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">Subject</label>
              <input
                v-model="form.subject"
                type="text"
                id="subject"
                required
                placeholder="Enter subject"
                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
              />
            </div>

            <!-- Message -->
            <div>
              <label for="message" class="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">Message</label>
              <textarea
                v-model="form.message"
                id="message"
                rows="5"
                required
                placeholder="Enter your message"
                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full group relative inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold text-sm sm:text-base rounded-lg overflow-hidden hover:from-cyan-600 hover:to-teal-600 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon v-if="isSubmitting" name="mdi:loading" class="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              <Icon v-else name="mdi:send" class="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>

            <!-- Status Message -->
            <div v-if="submitStatus" :class="[
              'text-center py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-xs sm:text-sm',
              submitStatus === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
            ]">
              {{ submitStatus === 'success' ? "Message sent successfully! I'll get back to you soon." : 'Failed to send message. Please try again or email me directly.' }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const config = useRuntimeConfig();

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const submitStatus = ref<'success' | 'error' | null>(null);

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Void-Brain70', icon: 'mdi:github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anik-chandra-a5a62022a/', icon: 'mdi:linkedin' },
  { label: 'WhatsApp', href: 'https://wa.me/8801521215839', icon: 'mdi:whatsapp' },
];

const sendEmail = async () => {
  isSubmitting.value = true;
  submitStatus.value = null;

  try {
    const emailjs = (await import('emailjs-com')).default;
    emailjs.init(config.public.emailjsPublicKey);

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      subject: form.subject,
      message: form.message,
      to_name: 'Anik Chandra',
      reply_to: form.email,
    };

    const response = await emailjs.send(
      config.public.emailjsServiceId,
      config.public.emailjsTemplateId,
      templateParams,
      config.public.emailjsPublicKey
    );

    if (response.status === 200) {
      submitStatus.value = 'success';
      form.name = '';
      form.email = '';
      form.subject = '';
      form.message = '';
    } else {
      submitStatus.value = 'error';
    }
  } catch (error) {
    console.error('Error sending email:', error);
    submitStatus.value = 'error';
  } finally {
    isSubmitting.value = false;
    setTimeout(() => { submitStatus.value = null; }, 5000);
  }
};
</script>
