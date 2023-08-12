package morningrolecall.heulgit.auth.dto;

import javax.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
@Schema(description = "인가 코드")
public class CodeDto {
	@NotBlank
	@Schema(description = "사용자 인가 코드", defaultValue = "12oi4lksdnv09devkodf")
	private String code;
}
