const EMAIL_SEND = process.env.EMAIL_SEND;

const mailOptions = (email: string, upcomingTask: string) => ({
    to: email,
    from: EMAIL_SEND,
    subject: 'Task Due Time Approaching',
    text: `Hello,

This is a reminder that the due time for your upcoming task is approaching:

${upcomingTask}

Please review the task details and complete the necessary steps before the deadline.

If you need any assistance, feel free to reach out.

Best regards,
`,
});

export default mailOptions;
