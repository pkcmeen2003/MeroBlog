import { TestBed } from '@angular/core/testing';

import { blogPostService } from './blogPost.service';

describe('HomeService', () => {
  let service: blogPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(blogPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
