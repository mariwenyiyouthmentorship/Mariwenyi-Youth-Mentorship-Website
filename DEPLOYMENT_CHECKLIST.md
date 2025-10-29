# Deployment Checklist

## Pre-Deployment Steps

### 1. Environment Variables
Set up the following environment variables in Vercel:

**Optional (for future database features):**
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### 2. Google Forms Setup
The following Google Forms are already configured:
- **Newsletter**: https://forms.gle/hDv6oiveQjTe7WH76
- **Contact**: https://forms.gle/dnqYk7uxCA8zpoYF8
- **Scholarship**: https://forms.gle/toYPqgFz6PRRCShCA

### 3. Build and Test
\`\`\`bash
npm run build
npm run start
\`\`\`

### 4. Deploy to Vercel
\`\`\`bash
vercel --prod
\`\`\`

## Post-Deployment Verification

### 1. Test Forms
- [ ] Newsletter subscription form
- [ ] Contact form
- [ ] Scholarship application form

### 2. Check Pages
- [ ] Home page loads correctly
- [ ] About page displays properly
- [ ] Contact page functions
- [ ] Apply page works
- [ ] Events page loads
- [ ] Donate page displays

### 3. Mobile Responsiveness
- [ ] Test on mobile devices
- [ ] Check tablet view
- [ ] Verify desktop layout

### 4. Performance
- [ ] Check page load speeds
- [ ] Verify image optimization
- [ ] Test form submission speeds

## Google Forms Management

### Accessing Form Responses
1. Go to Google Forms
2. Open each form using the URLs above
3. Click on "Responses" tab to view submissions
4. Set up email notifications for new responses

### Form Field Mapping
The forms are configured to match the website fields:

**Newsletter Form:**
- Email Address

**Contact Form:**
- Name
- Email
- Subject
- Message

**Scholarship Form:**
- Student Name
- School Level
- Current School
- Currently in School (Yes/No)
- KCPE Results
- Parent/Guardian Name
- Parent Occupation
- Parent Monthly Income
- Siblings Information
- Previous Sponsorship Details
- Last Term Fees
- Present Term Fees

## Troubleshooting

### Form Submission Issues
- Check browser console for errors
- Verify Google Forms URLs are accessible
- Test with different browsers

### Build Errors
- Run `npm run build` locally first
- Check for TypeScript errors
- Verify all imports are correct

### Performance Issues
- Check Vercel function logs
- Monitor Core Web Vitals
- Optimize images if needed
\`\`\`

Update the backend setup documentation:
