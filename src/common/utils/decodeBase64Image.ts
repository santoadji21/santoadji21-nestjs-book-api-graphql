import { BadRequestException } from '@nestjs/common';

export function decodeBase64Image(base64String: string): {
  buffer: Buffer;
  mimeType: string;
  extension: string;
} {
  const matchGroups = base64String.match(/^data:(image\/\w+);base64,(.*)$/);
  if (!matchGroups) {
    throw new BadRequestException('Invalid Base64 image data');
  }

  const mimeType = matchGroups[1];
  const base64Data = matchGroups[2];
  const buffer = Buffer.from(base64Data, 'base64');

  const mimeToExtension: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
  };

  const extension = mimeToExtension[mimeType];
  if (!extension) {
    throw new BadRequestException(`Unsupported MIME type: ${mimeType}`);
  }

  return { buffer, mimeType, extension };
}
