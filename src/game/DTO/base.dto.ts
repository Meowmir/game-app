import { validateSync } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export class DTOBase<T> {
  constructor(props: T) {
    Object.assign(this, props);
    const errors = validateSync(this);

    if (errors.length) {
      throw new BadRequestException(
        `Failed to validate ${this.constructor.name} for properties:\n ${errors
          .map((e) => `- ${e.property}`)
          .join('\n')}`,
      );
    }
  }
}
