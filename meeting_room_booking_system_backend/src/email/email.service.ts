import { Injectable } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: 'smtp.126.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'artsmp@126.com',
        pass: 'TWLLTAQFTQPGUGJC',
      },
    });
  }

  async sendEmail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: '会议室预定系统',
        address: 'artsmp@126.com',
      },
      to,
      subject,
      html,
    });
  }
}
