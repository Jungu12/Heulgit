package morningrolecall.heulgit.heulgit.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.amazonaws.Response;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.heulgit.Service.HeulgitService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/heulgit")
public class HeulgitController {

	private final Logger logger = LoggerFactory.getLogger(getClass());
	private final HeulgitService heulgitService;


	// @GetMapping("/test")
	// public ResponseEntity<?> addHeulgit(){
	// 	heulgitService.fetchAndSaveTopRepositories();
	// 	return ResponseEntity.ok().build();
	// }


	// @GetMapping("/posts")
	// public ResponseEntity<?> heulgitList(@RequestParam int pages) {
	// 	logger.debug("heulgitList(), pages = {}",pages);
	// 	return ResponseEntity.ok().body(heulgitService)
	// }



}
