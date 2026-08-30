export interface CardField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'date' | 'time' | 'email' | 'tel' | 'url' | 'select' | 'number'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
}

export interface CardTheme {
  id: string
  label: string
  bg: string
  accent: string
  text: string
}

export interface CardTypeConfig {
  id: string
  label: string
  emoji: string
  description: string
  gradient: string
  fields: CardField[]
  themes: CardTheme[]
  particleType: 'petals' | 'confetti' | 'hearts' | 'stars' | 'fireworks' | 'bubbles' | 'snow'
  openerType: 'envelope' | 'giftbox' | 'balloon' | 'flip' | 'locket' | 'scroll' | 'ticket' | 'crib' | 'book' | 'cracker'
}

export const CARD_TYPES: Record<string, CardTypeConfig> = {
  wedding: {
    id: 'wedding',
    label: 'Wedding Card',
    emoji: '💍',
    description: 'Invite guests to celebrate your special day',
    gradient: 'from-rose-950 via-pink-900 to-rose-800',
    particleType: 'petals',
    openerType: 'envelope',
    themes: [
      { id: 'elegant', label: 'Elegant Gold', bg: '#1a0808', accent: '#d4af37', text: '#f9f0e0' },
      { id: 'modern', label: 'Modern Rose', bg: '#12001a', accent: '#f472b6', text: '#fce7f3' },
      { id: 'festive', label: 'Festive Red', bg: '#1a0000', accent: '#ef4444', text: '#fff0f0' },
    ],
    fields: [
      { key: 'bride', label: "Bride's Name", type: 'text', placeholder: "Enter bride's name", required: true },
      { key: 'groom', label: "Groom's Name", type: 'text', placeholder: "Enter groom's name", required: true },
      { key: 'date', label: 'Wedding Date', type: 'date', required: true },
      { key: 'time', label: 'Ceremony Time', type: 'time', required: true },
      { key: 'venue', label: 'Venue Name', type: 'text', placeholder: 'e.g. Dhaka Sheraton Hotel', required: true },
      { key: 'address', label: 'Venue Address', type: 'text', placeholder: 'Full address', required: false },
      { key: 'message', label: 'Personal Message', type: 'textarea', placeholder: 'Write your invitation message...', required: false },
    ],
  },
  birthday: {
    id: 'birthday',
    label: 'Birthday Card',
    emoji: '🎂',
    description: "Make someone's birthday extra special",
    gradient: 'from-purple-950 via-violet-900 to-indigo-900',
    particleType: 'confetti',
    openerType: 'balloon',
    themes: [
      { id: 'colorful', label: 'Colorful Party', bg: '#1a0030', accent: '#a855f7', text: '#f3e8ff' },
      { id: 'pastel', label: 'Pastel Dream', bg: '#0d0a1e', accent: '#818cf8', text: '#e0e7ff' },
      { id: 'dark', label: 'Dark Galaxy', bg: '#020010', accent: '#7c3aed', text: '#ede9fe' },
    ],
    fields: [
      { key: 'name', label: "Birthday Person's Name", type: 'text', placeholder: 'Enter their name', required: true },
      { key: 'age', label: 'Age (optional)', type: 'number', placeholder: 'e.g. 25', required: false },
      { key: 'from', label: 'From', type: 'text', placeholder: 'Your name or "The Family"', required: true },
      { key: 'date', label: 'Birthday Date', type: 'date', required: true },
      { key: 'message', label: 'Birthday Message', type: 'textarea', placeholder: 'Write a heartfelt message...', required: false },
    ],
  },
  visiting: {
    id: 'visiting',
    label: 'Visiting Card',
    emoji: '🪪',
    description: 'Share your professional identity digitally',
    gradient: 'from-slate-950 via-slate-900 to-zinc-900',
    particleType: 'stars',
    openerType: 'flip',
    themes: [
      { id: 'professional', label: 'Professional Dark', bg: '#050a10', accent: '#38bdf8', text: '#f0f9ff' },
      { id: 'creative', label: 'Creative Purple', bg: '#0a0514', accent: '#c084fc', text: '#faf5ff' },
      { id: 'minimal', label: 'Minimal White', bg: '#0f0f0f', accent: '#22d3ee', text: '#ecfeff' },
    ],
    fields: [
      { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name', required: true },
      { key: 'title', label: 'Job Title', type: 'text', placeholder: 'e.g. Full-Stack Developer', required: true },
      { key: 'company', label: 'Company / Organization', type: 'text', placeholder: 'Company name', required: false },
      { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', required: true },
      { key: 'phone', label: 'Phone', type: 'tel', placeholder: '+880 1234 567890', required: false },
      { key: 'website', label: 'Website / Portfolio', type: 'url', placeholder: 'https://yoursite.com', required: false },
      { key: 'address', label: 'Location', type: 'text', placeholder: 'City, Country', required: false },
      { key: 'tagline', label: 'Tagline / Bio', type: 'textarea', placeholder: 'A short professional bio...', required: false },
    ],
  },
  gift: {
    id: 'gift',
    label: 'Gift Card',
    emoji: '🎁',
    description: 'Attach a personalized message to your gift',
    gradient: 'from-emerald-950 via-teal-900 to-green-900',
    particleType: 'confetti',
    openerType: 'giftbox',
    themes: [
      { id: 'luxury', label: 'Luxury Gold', bg: '#0a0800', accent: '#d4af37', text: '#fefce8' },
      { id: 'nature', label: 'Nature Green', bg: '#000a05', accent: '#4ade80', text: '#f0fdf4' },
      { id: 'ocean', label: 'Ocean Blue', bg: '#00050a', accent: '#22d3ee', text: '#ecfeff' },
    ],
    fields: [
      { key: 'to', label: 'To', type: 'text', placeholder: "Recipient's name", required: true },
      { key: 'from', label: 'From', type: 'text', placeholder: 'Your name', required: true },
      { key: 'occasion', label: 'Occasion', type: 'select', required: true, options: [
        { value: 'Birthday', label: 'Birthday' },
        { value: 'Wedding', label: 'Wedding' },
        { value: 'Anniversary', label: 'Anniversary' },
        { value: 'Christmas', label: 'Christmas' },
        { value: 'Eid', label: 'Eid' },
        { value: 'Other', label: 'Other' },
      ]},
      { key: 'message', label: 'Gift Message', type: 'textarea', placeholder: 'Write your gift message...', required: true },
    ],
  },
  anniversary: {
    id: 'anniversary',
    label: 'Anniversary Card',
    emoji: '❤️',
    description: 'Celebrate your love milestones together',
    gradient: 'from-red-950 via-rose-900 to-pink-900',
    particleType: 'hearts',
    openerType: 'locket',
    themes: [
      { id: 'romantic', label: 'Romantic Red', bg: '#1a0000', accent: '#f43f5e', text: '#fff1f2' },
      { id: 'golden', label: 'Golden Years', bg: '#0f0a00', accent: '#d4af37', text: '#fefce8' },
      { id: 'silver', label: 'Silver Love', bg: '#050510', accent: '#94a3b8', text: '#f8fafc' },
    ],
    fields: [
      { key: 'name1', label: 'Partner 1 Name', type: 'text', placeholder: 'First name', required: true },
      { key: 'name2', label: 'Partner 2 Name', type: 'text', placeholder: 'Second name', required: true },
      { key: 'years', label: 'Years Together', type: 'number', placeholder: 'e.g. 5', required: true },
      { key: 'date', label: 'Anniversary Date', type: 'date', required: true },
      { key: 'message', label: 'Love Message', type: 'textarea', placeholder: 'Express your love...', required: false },
    ],
  },
  festival: {
    id: 'festival',
    label: 'Festival Card',
    emoji: '🎉',
    description: 'Celebrate Eid, New Year, and all festivals',
    gradient: 'from-amber-950 via-yellow-900 to-orange-900',
    particleType: 'fireworks',
    openerType: 'cracker',
    themes: [
      { id: 'eid', label: 'Eid Special', bg: '#001a0d', accent: '#fbbf24', text: '#fefce8' },
      { id: 'newyear', label: 'New Year', bg: '#000010', accent: '#818cf8', text: '#eef2ff' },
      { id: 'diwali', label: 'Diwali Glow', bg: '#1a0800', accent: '#fb923c', text: '#fff7ed' },
    ],
    fields: [
      { key: 'festival', label: 'Festival Name', type: 'select', required: true, options: [
        { value: 'Eid Mubarak', label: 'Eid Mubarak' },
        { value: 'Eid ul Adha', label: 'Eid ul Adha' },
        { value: 'Happy New Year', label: 'Happy New Year' },
        { value: 'Pohela Boishakh', label: 'Pohela Boishakh' },
        { value: 'Durga Puja', label: 'Durga Puja' },
        { value: 'Diwali', label: 'Diwali' },
        { value: 'Christmas', label: 'Christmas' },
        { value: 'Other', label: 'Other Festival' },
      ]},
      { key: 'from', label: 'From', type: 'text', placeholder: 'Your name / family', required: true },
      { key: 'to', label: 'To (optional)', type: 'text', placeholder: 'Recipient or "Everyone"', required: false },
      { key: 'message', label: 'Festival Greeting', type: 'textarea', placeholder: 'Add your festive message...', required: false },
    ],
  },
  graduation: {
    id: 'graduation',
    label: 'Graduation Card',
    emoji: '🎓',
    description: 'Celebrate academic achievements',
    gradient: 'from-blue-950 via-indigo-900 to-blue-900',
    particleType: 'confetti',
    openerType: 'scroll',
    themes: [
      { id: 'classic', label: 'Classic Blue', bg: '#00050f', accent: '#3b82f6', text: '#eff6ff' },
      { id: 'golden', label: 'Golden Honors', bg: '#0f0a00', accent: '#d4af37', text: '#fefce8' },
      { id: 'maroon', label: 'Maroon Pride', bg: '#0f0000', accent: '#ef4444', text: '#fef2f2' },
    ],
    fields: [
      { key: 'name', label: "Graduate's Name", type: 'text', placeholder: 'Full name', required: true },
      { key: 'degree', label: 'Degree / Program', type: 'text', placeholder: 'e.g. BSc in Computer Science', required: true },
      { key: 'school', label: 'Institution', type: 'text', placeholder: 'University / College name', required: true },
      { key: 'year', label: 'Graduation Year', type: 'text', placeholder: 'e.g. 2026', required: true },
      { key: 'from', label: 'From', type: 'text', placeholder: 'Your name / family', required: true },
      { key: 'message', label: 'Congratulations Message', type: 'textarea', placeholder: 'Share your proud message...', required: false },
    ],
  },
  thankyou: {
    id: 'thankyou',
    label: 'Thank You Card',
    emoji: '🙏',
    description: 'Express gratitude with a heartfelt card',
    gradient: 'from-teal-950 via-cyan-900 to-teal-900',
    particleType: 'stars',
    openerType: 'book',
    themes: [
      { id: 'warm', label: 'Warm Gratitude', bg: '#0a0500', accent: '#f59e0b', text: '#fffbeb' },
      { id: 'cool', label: 'Cool Teal', bg: '#00080a', accent: '#2dd4bf', text: '#f0fdfa' },
      { id: 'earthy', label: 'Earthy Olive', bg: '#050a00', accent: '#84cc16', text: '#f7fee7' },
    ],
    fields: [
      { key: 'to', label: 'To', type: 'text', placeholder: 'Who are you thanking?', required: true },
      { key: 'from', label: 'From', type: 'text', placeholder: 'Your name', required: true },
      { key: 'reason', label: 'Reason (optional)', type: 'text', placeholder: 'e.g. for the beautiful gift', required: false },
      { key: 'message', label: 'Thank You Message', type: 'textarea', placeholder: 'Write from the heart...', required: true },
    ],
  },
  baby: {
    id: 'baby',
    label: 'New Baby Card',
    emoji: '👶',
    description: 'Announce a new arrival with joy',
    gradient: 'from-sky-950 via-blue-900 to-cyan-900',
    particleType: 'bubbles',
    openerType: 'crib',
    themes: [
      { id: 'blue', label: 'Baby Blue', bg: '#00050a', accent: '#38bdf8', text: '#f0f9ff' },
      { id: 'pink', label: 'Baby Pink', bg: '#0f0005', accent: '#f9a8d4', text: '#fdf2f8' },
      { id: 'neutral', label: 'Soft Neutral', bg: '#080808', accent: '#a78bfa', text: '#faf5ff' },
    ],
    fields: [
      { key: 'babyName', label: "Baby's Name", type: 'text', placeholder: "Enter baby's name", required: true },
      { key: 'dob', label: 'Date of Birth', type: 'date', required: true },
      { key: 'weight', label: 'Weight (optional)', type: 'text', placeholder: 'e.g. 3.2 kg', required: false },
      { key: 'parents', label: "Parents' Names", type: 'text', placeholder: 'e.g. Anik & Priya', required: true },
      { key: 'message', label: 'Announcement Message', type: 'textarea', placeholder: 'Share the joyful news...', required: false },
    ],
  },
  invitation: {
    id: 'invitation',
    label: 'Invitation Card',
    emoji: '📩',
    description: 'Invite people to any event or gathering',
    gradient: 'from-violet-950 via-purple-900 to-fuchsia-900',
    particleType: 'stars',
    openerType: 'ticket',
    themes: [
      { id: 'formal', label: 'Formal Event', bg: '#05000a', accent: '#a855f7', text: '#faf5ff' },
      { id: 'casual', label: 'Casual Party', bg: '#0a0005', accent: '#ec4899', text: '#fdf2f8' },
      { id: 'corporate', label: 'Corporate', bg: '#000508', accent: '#0ea5e9', text: '#f0f9ff' },
    ],
    fields: [
      { key: 'eventName', label: 'Event Name', type: 'text', placeholder: 'e.g. Annual Dinner Party', required: true },
      { key: 'host', label: 'Host Name', type: 'text', placeholder: 'Your name or organization', required: true },
      { key: 'date', label: 'Event Date', type: 'date', required: true },
      { key: 'time', label: 'Event Time', type: 'time', required: true },
      { key: 'venue', label: 'Venue', type: 'text', placeholder: 'Venue name', required: true },
      { key: 'address', label: 'Address', type: 'text', placeholder: 'Full address', required: false },
      { key: 'dress', label: 'Dress Code (optional)', type: 'text', placeholder: 'e.g. Smart Casual', required: false },
      { key: 'message', label: 'Additional Details', type: 'textarea', placeholder: 'Any other information...', required: false },
    ],
  },
}

export function encodeCardData(data: Record<string, any>): string {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(data))))
  } catch {
    return ''
  }
}

export function decodeCardData(encoded: string): Record<string, any> | null {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(encoded))))
  } catch {
    return null
  }
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

export function formatTime(timeStr: string): string {
  if (!timeStr) return ''
  const [h, m] = timeStr.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`
}
